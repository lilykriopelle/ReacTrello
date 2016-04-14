json.extract! current_user, :email
json.avatar_url asset_path(current_user.avatar.url)
