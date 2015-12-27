class Api::ListsController < ApplicationController

  def update
    list_params[:cards].values.each_with_index do |card_attrs, index|
      Card.find(card_attrs[:id]).update(ord: index)
    end
    render json: true
  end

  private
    def list_params
      params.require(:list).permit(cards: [:title, :ord, :id, :list_id])
    end
end
