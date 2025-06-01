import { refreshtokens } from '../models/refreshtokens';

export const refreshTokensRepository = {
  findAll: (): Promise<refreshtokens[]> =>
    refreshtokens.findAll(),

  findById: (id: number): Promise<refreshtokens | null> =>
    refreshtokens.findByPk(id),
  
  create: (data: {
    id_usuario: number;
    token: string;
    expires_at: Date;
    is_revoked: boolean;
  }) => refreshtokens.create(data),

  findByToken: (token: string) =>
    refreshtokens.findOne({ where: { token } }),

  revokeById: (id_token: number) =>
    refreshtokens.update({ is_revoked: true }, { where: { id_token } }),

  revokeByToken: (token: string) =>
    refreshtokens.update({ is_revoked: true }, { where: { token } }),
};
