class Api::ListsController < ApplicationController

  def update
    list_params[:cards].values.each_with_index do |card_attrs, index|
      Card.find(card_attrs[:id]).update(ord: index)
    end
    render json: true
  end

  def create
    @list = List.new(list_params)
    @list.ord = @list.board.lists.length
    
    if @list.save
      render :show
    else
      render json: @list.errors.full_messages
    end
  end

  private
    def list_params
      params.require(:list).permit(:title, :board_id, cards: [:title, :ord, :id, :list_id])
    end
end
