json.extract! board_membership, :id, :board_id

json.user do
  json.partial! 'api/users/user', user: board_membership.user
end
