class VotesController < ApplicationController

    

    def create
        
        post_id = params[:post_id]
        vote = Vote.new
        vote.post_id = params[:post_id]
        vote.upvote = params[:upvote]
        vote.user_id = current_user.id

        #check if vote by existing user exists 
        existing_vote = Vote.where(user_id: current_user.id, post_id: post_id)
        @new_vote = existing_vote.size < 1
        if existing_vote.size > 0
            #destroy existing vote
            existing_vote.first.destroy
        else
            #save new vote
            if vote.save 
                
                render json: vote, status: :created
            else
               
                render json: vote.errors, status: :bad_request
            end

        end
        @post = Post.find(post_id)
        
    end

    

    private

    def vote_params
        params.require(:vote).permit(:post_id, :upvote)
    end


end
