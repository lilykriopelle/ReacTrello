# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  list_id     :integer          not null
#  description :text
#  ord         :float            default(0.0)
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  validates :title, :list_id, presence: true

  belongs_to :list
  has_one :board, through: :list, source: :board

  has_many :comments

  default_scope { order(:ord) }
end
