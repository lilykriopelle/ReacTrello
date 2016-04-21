class Api::UsersController < ApplicationController
  def search
    @users = User.where("email ~ ?", params[:query])
  end
end
