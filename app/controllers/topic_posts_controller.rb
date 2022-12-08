class TopicPostsController < ApplicationController

    skip_before_action :authorized, only: [:index, :show]
    before_action :set_topic_post, only: [:show, :update, :create, :destroy]

    def index 
        @topic_posts = TopicPost.all
        render json: @topic_posts
    end

    def show
        if @topic_post
            render json: @topic_post
        else
            render json: {message: "Item not found!"}, status: :bad_request
        end
    end

    def create 
        @topic_post = TopicPost.new(topic_post_params)
        if @topic_post.save
          render json: @topic_post, status: :ok
        else
          render json: { errors: @topic_post.errors.full_messages }, status: :unprocessable_entity
        end
      end

    def update
        if @topic_post
          if @topic_post.update(topic_post_params)
            render json: @topic_post, status: :ok
          else
            render json: { errors: @topic_post.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: "Topic_post not found" }, status: :bad_request
        end
      end
    
      def destroy
        if @topic_post
          @topic_post.destroy
          render json: @topic_post, status: :ok
        else
          render json: { errors: "Topic_post not found" }, status: :bad_request
        end
      end

    private

    def set_topic_post 
        @topic_post = TopicPost.find_by(id: params[:id])
    end

    def topic_post_params
        params.require(:topic_post).permit(:topic_id, :post_id)
    end

end
