class Api::SessionsController < ApplicationController
  def destroy
    sign_out!
    render json: true
  end

  def update
    if current_user.update(current_user_params)
      render :show
    else
      render json: current_user.errors.full_messages
    end
  end

  def show
  end

  private
  def current_user_params
    params.require(:user).permit(:avatar)
  end
end
