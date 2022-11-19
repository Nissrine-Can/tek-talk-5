class PostsController < ApplicationController
    before_action :set_post, only: [:show]
    skip_before_action :authorized, only: [:index, :show]

    def index
        posts = Post.all.order(created_at: :desc)
        render json: posts
    end

    def show
        if @post
            render json: @post
        else
            render json: {message: "Item not found!"}, status: :bad_request
        end
    end

    def create
        @post = Post.new(post_params)
        # post.user_id = current_user.id
        if @post.save
            render json: @post, status: :ok
        else
            render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
        end
    end



    private

    def set_post
        @post = Post.find_by_id(params[:id])
    end

    def post_params
        params.require(:post).permit(:title, :body, :user_id)
    end




end
