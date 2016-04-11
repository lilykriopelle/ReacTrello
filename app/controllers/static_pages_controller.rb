class StaticPagesController < ApplicationController
  before_action :redirect_if_not_logged_in

  def root
    render :root
  end

  def redirect_if_not_logged_in
    if (current_user.nil?)
      redirect_to new_session_url
    end
  end

end
