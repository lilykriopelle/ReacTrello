json.extract! card, :id, :title, :ord, :list_id, :description
json.list_title card.list.title
json.board_id card.board.id
json.comments do
  json.array! card.comments, partial: 'api/comments/comment', as: :comment
end
