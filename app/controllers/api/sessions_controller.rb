class Api::SessionsController < ApplicationController
  def destroy
    sign_out!
    render json: true
  end


end
