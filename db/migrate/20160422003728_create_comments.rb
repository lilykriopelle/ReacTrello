class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false
      t.text :body, null: false
    end
  end
end
