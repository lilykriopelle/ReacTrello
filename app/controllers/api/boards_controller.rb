class Api::BoardsController < ApplicationController

  def create
    @board = current_user.boards.new(board_params)
    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    board_params[:lists].values.each_with_index do |list_attrs, index|
      List.find(list_attrs[:id]).update(ord: index)
    end
    render json: true
  end

  def show
    @board = Board.includes(:owner, lists: [cards: :board]).find(params[:id])
    render :show
  end

  def index
    @boards = current_user.boards.includes(:owner)
    render :index
  end

  private
    def board_params
      params.require(:board).permit(:title, :owner_id, lists: [:id, :title, :board_id, :ord, cards: [:title, :ord, :id, :list_id, :board_id]])
    end
end
