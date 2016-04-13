class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: :new

  def create
    user = User.find_by_credentials(email: params[:email], password: params[:password])
    if user
      sign_in!(user)
    else
      flash.now[:errors] = ["Invalid email/password combination."]
      render :new
    end
  end

  def new
    render :new
  end

  def destroy
  end

  def redirect_if_logged_in
    if current_user
      redirect_to root_url
    end
  end

end
