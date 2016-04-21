class Api::UsersController < ApplicationController
  def search
      @users = User
        .where("email ~ ?", params[:query])
        .where.not(id: current_user.id)
  end
end
