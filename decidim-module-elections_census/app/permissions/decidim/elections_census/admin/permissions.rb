# frozen_string_literal: true

module Decidim
  module ElectionsCensus
    module Admin
      class Permissions < Decidim::DefaultPermissions
        def permissions
          return permission_action if permission_action.scope != :admin
          return permission_action if permission_action.subject != :voter
          return permission_action unless user
          return permission_action unless user.admin?

          case permission_action.action
          when :verify, :read, :unverify
            allow!
          end

          permission_action
        end

        private

        def voter
          @voter ||= context.fetch(:voter, nil)
        end
      end
    end
  end
end
