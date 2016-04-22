json.extract! @board_membership, :board_id

json.user do
  json.partial! 'api/users/user', user: @board_membership.user
end
