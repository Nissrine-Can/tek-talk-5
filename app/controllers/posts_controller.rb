class PostsController < ApplicationController
    before_action :set_post, only: [:show]
    skip_before_action :authorized, only: [:index, :show]

    def index
        
        @posts = Post.all.order(created_at: :desc)
           
        if params[:search]
        @posts = posts.where('lower(body) LIKE ?', "%#{params[:search].downcase}%")
        elsif params[:name]
        @topic_name = Topic.find_by(name: params[:name])
        @posts = @topic_name.posts
        end
        render json: @posts, status: :ok
    end

    def show
        if @post
            render json: @post, include: [comments: { include: [:user]}]
        else
            render json: {message: "Item not found!"}, status: :bad_request
        end
    end

    def create
        @post = Post.create(post_params)
        @post.topic_posts.create({post_id: @post.id, topic_id: params['topic_ids'][0]})
        
        # post.user_id = current_user.id
        if @post.save
            render json: @post, status: :ok
        else
            render json: {errors: @post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    
    def update
        if @post
          if @video.update(post_params)
            render json: @post, status: :ok
          else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: "Your post is not updating" }, status: :bad_request
        end
      end
    
      def destroy
        if @post
          @post.destroy
          render json: @post, status: :ok
        else
          render json: { errors: "Post delete propblem" }, status: :bad_request
        end
      end
    


    private

    def set_post
        @post = Post.find_by_id(params[:id])
    end

    def post_params
        params.require(:post).permit(:title, :body, :user_id, topic_ids: [])
    end




end
