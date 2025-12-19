'use client'

import Image from 'next/image'
import { Users, Crown, Shield } from 'lucide-react'

interface Member {
  id: string
  name: string
  avatar?: string
  role: string
}

interface OnlineUsersProps {
  members: Member[]
  onlineUsers: Member[]
  memberCount: number
}

export default function OnlineUsers({ members, onlineUsers, memberCount }: OnlineUsersProps) {
  const onlineIds = new Set(onlineUsers.map(u => u.id))

  function getRoleIcon(role: string) {
    if (role === 'ADMIN') return <Crown className="w-3 h-3 text-accent-gold" />
    if (role === 'MODERATOR') return <Shield className="w-3 h-3 text-blue-400" />
    return null
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{memberCount} members</span>
        </div>
        <div className="flex items-center gap-2 text-green-500 mt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm">{onlineUsers.length} online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {onlineUsers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              Online
            </h4>
            <div className="space-y-1">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800/50"
                >
                  <div className="relative">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-accent-burgundy/30 flex items-center justify-center">
                        <span className="text-accent-gold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-deep-black" />
                  </div>
                  <span className="text-sm text-white truncate flex-1">{user.name}</span>
                  {getRoleIcon(user.role)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
            Members
          </h4>
          <div className="space-y-1">
            {members.filter(m => !onlineIds.has(m.id)).map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800/50"
              >
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover opacity-60"
                    unoptimized
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-sm text-gray-500 truncate flex-1">{member.name}</span>
                {getRoleIcon(member.role)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
