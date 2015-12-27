class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(email: params[:email], password: params[:password])
    if user
      sign_in!(user)
    else
      render :new
    end
  end

  def new
    render :new
  end

  def destroy
  end

end
