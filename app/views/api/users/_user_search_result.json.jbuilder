json.extract! user, :id, :email
json.avatar_url asset_url(user.avatar.url(:original))
