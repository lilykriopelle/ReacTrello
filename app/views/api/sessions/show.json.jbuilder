json.extract! current_user, :email
json.avatar_url image_url(current_user.avatar.url)
