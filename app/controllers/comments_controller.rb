class CommentsController < ApplicationController
    before_action :set_post
    # skip_before_action :authorized, only: [:index]


    def index 
        render json: Comment.all.order(created_at: :desc)
    end

    def create 
        @comment = @post.comments.build(comment_params)
        if @comment.save
            render json: @comment, status: :created
        else
            render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def set_post
        @post = Post.find_by_id(params[:post_id])
    end

    def comment_params
        params.permit(:body, :user_id)
    end


end
