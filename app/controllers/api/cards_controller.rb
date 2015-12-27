class Api::CardsController < ApplicationController

  def create
    @card = Card.new(card_params)
    @card.ord = List.find(card_params[:list_id]).cards.length
    if @card.save
      render :show
    else
      render @card.errors.full_messages
    end
  end

  private
    def card_params
      params.require(:card).permit(:title, :list_id, :ord)
    end
end
