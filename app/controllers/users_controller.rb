class UsersController < ApplicationController

  def index
    @users = User.where.not(id:params[:user_ids]).where('name LIKE(?)', "%#{params[:search]}%")
    respond_to do |format|
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:email)
  end

end
