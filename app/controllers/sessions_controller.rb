class SessionsController < ApplicationController

    skip_before_action :authorized, only: [:create]

  def create
    @user = User.find_by(username: params[:username])
    #User#authenticate comes from BCrypt
    if @user && @user.authenticate(params[:password])
      
      token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    else
      render json: { message: 'Invalid credentials' }, status: :unauthorized
    end
  end

 
end
