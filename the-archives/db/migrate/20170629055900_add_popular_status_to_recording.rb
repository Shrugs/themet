class AddPopularStatusToRecording < ActiveRecord::Migration[5.0]
  def change
    add_column :recordings, :popular, :boolean
  end
end
