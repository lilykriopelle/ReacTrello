class Api::UsersController < ApplicationController
  def search
    if params[:query] != ""
      @users = User
        .where("email ~ ?", params[:query])
        .where.not(id: current_user.id)
    else
      @users = []
    end  
  end
end
