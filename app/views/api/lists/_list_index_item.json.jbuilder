json.extract! list, :id, :title, :ord, :board_id

json.cards do
  json.array! list.cards, partial: 'api/cards/card_index_item', as: :card
end
