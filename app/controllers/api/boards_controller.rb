class Api::BoardsController < ApplicationController

  def create
    @board = Board.new(board_params)
    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @board = Boardfind(params[:id]).update(board_params)
    if @board.save
      render :show
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
  end

  def show
    @board = Board.includes(:owner, lists: :cards).find(params[:id])
    render :show
  end

  def index
    @boards = current_user.boards.includes(:owner)
    render :index
  end

  private
    def board_params
      params.require(:board).permit(:title, :owner_id)
    end
end
