class TopicsController < ApplicationController
    before_action :set_topic, only: [:show]
    skip_before_action :authorized, only: [:index, :show]

    def index
        @topics = Topic.all
        render json: @topics
    end

    def show
       
        if @topic
            render json: @topic
        else
            render json: { message: 'Topic not found' }, status: :bad_request
        end
    end

    def create
        @topic = Topic.new(topic_params)
        if @topic.save
            render json: @topic, status: :ok
        else
            render json: {errors: @topic.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def set_topic
        @topic = Topic.find_by(name: params[:name])
    end

    def topic_params
        params.require(:topic).permit(:name)
    end

end
