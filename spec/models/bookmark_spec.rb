require 'rails_helper'

describe Bookmark do
  subject { FactoryGirl::create(:bookmark) }

  context 'associations' do
    it { should belong_to(:author) }
    it { should belong_to(:story) }
  end

  context 'validations' do
    it { should validate_presence_of(:story) }
    it { should validate_presence_of(:author) }


    it { should validate_uniqueness_of(:author).scoped_to(:story) }
  end
end
