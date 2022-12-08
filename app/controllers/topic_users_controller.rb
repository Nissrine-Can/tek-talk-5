class TopicUsersController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    before_action :set_topic_user, only: [:show, :update, :create, :destroy]

    def index 
        @topic_users = TopicUser.all
        render json: @topic_users
    end

    def show
        if @topic_user
            render json: @topic_user
        else
            render json: {message: "Item not found!"}, status: :bad_request
        end
    end

    def create 
        @topic_user = TopicUser.new(topic_user_params)
        if @topic_user.save
          render json: @topic_user, status: :ok
        else
          render json: { errors: @topic_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def update
        if @topic_user
          if @topic_user.update(topic_user_params)
            render json: @topic_user, status: :ok
          else
            render json: { errors: @topic_user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: "Topic_user not found" }, status: :bad_request
        end
      end
    
      def destroy
        if @topic_user
          @topic_user.destroy
          render json: @topic_user, status: :ok
        else
          render json: { errors: "Topic_user not found" }, status: :bad_request
        end
      end

    private

    def set_topic_user 
        @topic_user = TopicUser.find_by(id: params[:id])
    end

    def topic_user_params
        params.require(:topic_user).permit(:topic_id, :user_id)
    end


end
