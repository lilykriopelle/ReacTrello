class Board < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :lists

  has_many :board_memberships

  has_many :users,
    through: :board_memberships,
    source: :user

end
