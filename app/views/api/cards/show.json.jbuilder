json.partial! 'api/cards/card_index_item', card: @card

json.board_id @card.board.id

json.list_id @card.list_id
