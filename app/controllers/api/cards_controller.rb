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

  def update
    @card = Card.includes(comments: :user).find(params[:id])
    list = @card.list
    @card.update(card_params)
    update_card_ords(@card.list)
    update_card_ords(list)
    render :show
  end

  private
    def update_card_ords(list)
      list.cards.order(:updated_at).each_with_index do |card, index|
        card.ord = index
        card.save!
      end
    end

    def card_params
      params.require(:card).permit(:title, :list_id, :ord, :description)
    end
end
