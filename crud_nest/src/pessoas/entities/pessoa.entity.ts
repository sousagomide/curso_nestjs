import { IsEmail } from 'class-validator';
import { RoutePolicies } from 'src/auth/enum/route-policies.enum';
import { Recado } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  @IsEmail()
  email: string;
  @Column({ length: 255 })
  passwordHash: string;
  @Column({ length: 100 })
  nome: string;

  // Uma pessoa pode ter enviado muitos recados (como "de")
  // Esses recados são relacionados ao campo "de" na entidade recado
  @OneToMany(() => Recado, recado => recado.de)
  recadosEnviados: Recado[];

  @OneToMany(() => Recado, recado => recado.para)
  recadosRecebidos: Recado[];

  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({default: true})
  isActive: boolean;

  @Column({ type: 'simple-array', default: [] })
  routePolicies: RoutePolicies[];
}
