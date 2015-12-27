class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.integer :board_id, null: false
      t.float :ord, default: 0

      t.timestamps
    end

    add_index :lists, :board_id
    add_index :users, :email
    add_index :users, :session_token
  end
end
