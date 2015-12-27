class Board < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_many :lists
end
