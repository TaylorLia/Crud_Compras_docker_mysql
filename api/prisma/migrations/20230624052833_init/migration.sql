-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` INTEGER NULL,
    `bairro` VARCHAR(191) NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NULL,
    `fone` VARCHAR(191) NULL,
    `is_adm` BOOLEAN NOT NULL DEFAULT false,
    `ultimo_acesso` DATETIME(3) NULL,

    UNIQUE INDEX `Usuario_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `preco` DOUBLE NOT NULL,
    `imagem` VARCHAR(191) NULL,
    `categoria` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `dt_inclusao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dt_alteracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vlr_total` DOUBLE NOT NULL,
    `status` ENUM('PENDENTE', 'PAGO', 'FINALIZADO') NOT NULL DEFAULT 'PENDENTE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrinho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedido_id` INTEGER NOT NULL,
    `produto_id` INTEGER NOT NULL,
    `qtde` INTEGER NOT NULL,
    `vlr_unitario` DOUBLE NOT NULL,

    UNIQUE INDEX `Carrinho_pedido_id_produto_id_key`(`pedido_id`, `produto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `Pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
