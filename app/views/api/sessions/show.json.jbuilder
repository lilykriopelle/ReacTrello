json.extract! current_user, :email
json.avatar_url asset_url(current_user.avatar.url)
