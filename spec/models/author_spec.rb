require 'rails_helper'

describe Author do

  context 'authentication' do
    context '#password=' do
      it 'encrypts password into database' do
        author = FactoryGirl.build(:author, password_digest: '')
        author.password = 'annakarenina'
        expect(author.password_digest).not_to be_empty
        expect(author.password_digest).not_to eql(author.password)
      end
    end

    context '#create_session' do
      it 'creates a session' do
        author = FactoryGirl.build(:author)
        expect { author.create_session }.to change { Session.count }.by(1)
      end
    end
  end

  subject { FactoryGirl.build(:author) }

  context 'associations' do
    it { should have_many(:stories).dependent(:destroy) }
    it { should have_many(:favorites).dependent(:destroy) }
    it { should have_many(:bookmarks).dependent(:destroy) }
    it { should have_many(:sessions).dependent(:destroy) }
    it { should have_many(:follows).dependent(:destroy) }
    it { should have_many(:followers) }
    it { should have_many(:following) }
  end

  context 'validations' do
    it { should validate_presence_of(:pen_name) }
    it { should validate_presence_of(:password_digest) }
    it { should validate_presence_of(:username) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_uniqueness_of(:email) }
    it { should validate_length_of(:password) }
    it { should validate_length_of(:description) }
  end
end
