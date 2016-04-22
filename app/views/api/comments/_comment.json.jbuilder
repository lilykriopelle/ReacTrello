json.extract! comment, :id, :body, :card_id

json.author do
  json.partial! 'api/users/user', user: comment.user
end
