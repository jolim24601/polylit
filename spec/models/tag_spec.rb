require 'rails_helper'

describe Tag do
  subject { FactoryGirl::build(:tag) }

  context 'associations' do
    it { should have_many(:taggings).dependent(:destroy) }
    it { should have_many(:stories) }
    it { should have_many(:follows).dependent(:destroy) }
    it { should have_many(:followers) }
  end

  context 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
    it { should validate_length_of(:name) }
  end
end
