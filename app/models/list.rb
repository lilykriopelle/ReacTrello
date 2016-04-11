class List < ActiveRecord::Base

  belongs_to :board
  has_many :cards

  default_scope { order(:ord) }
end
