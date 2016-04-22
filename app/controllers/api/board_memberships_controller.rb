class Api::BoardMembershipsController < ApplicationController

  def create
    @board_membership = BoardMembership.new(board_membership_params)
    if @board_membership.save
      render :show
    else
      render json: @board_membership.errors.full_messages
    end
  end

  def destroy
    @board_membership = BoardMembership.find(params[:id])
    if @board_membership.destroy
      render json: true
    else
      render json: false
    end
  end

  private
    def board_membership_params
      params.require(:board_membership).permit(:board_id, :user_id)
    end
end
