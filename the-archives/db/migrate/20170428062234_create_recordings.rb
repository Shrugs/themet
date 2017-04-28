class CreateRecordings < ActiveRecord::Migration[5.0]
  def change
    create_table :recordings do |t|
      t.integer :num
      t.attachment :image
      t.string :narrarator
      t.string :author
      t.string :title
      t.text :transcript
      t.attachment :audio

      t.timestamps
    end

    add_index :recordings, :num, unique: true
  end
end
