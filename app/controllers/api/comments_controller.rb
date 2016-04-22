class Api::CommentsController < ApplicationController
  def create
    @comment = Card.find(params[:card_id]).comments.new(comment_params)
    @comment.user_id = current_user.id
    
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
