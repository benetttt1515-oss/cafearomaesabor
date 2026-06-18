package com.somativa.cafearomaesabor.config;

import com.somativa.cafearomaesabor.model.Produto;
import com.somativa.cafearomaesabor.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(ProdutoRepository produtoRepository) {
        return args -> {
            // Verifica se já existem produtos
            if (produtoRepository.count() == 0) {
                // Cria produtos de exemplo
                Produto p1 = new Produto();
                p1.setNome("Café Grão Especial (Arabica)");
                p1.setCategoria("☕ Café e Derivados");
                p1.setPreco(45.50);
                p1.setQuantidade(50);
                p1.setEstoqueMinimo(10);
                p1.setDescricao("Café em grão de alta qualidade");
                p1.setFornecedor("Fornecedor A");

                Produto p2 = new Produto();
                p2.setNome("Café Solúvel (Nescafé 200g)");
                p2.setCategoria("☕ Café e Derivados");
                p2.setPreco(8.90);
                p2.setQuantidade(100);
                p2.setEstoqueMinimo(20);
                p2.setDescricao("Café solúvel instantâneo");
                p2.setFornecedor("Fornecedor B");

                Produto p3 = new Produto();
                p3.setNome("Açúcar Cristal");
                p3.setCategoria("🍬 Açúcar e Adoçantes");
                p3.setPreco(3.50);
                p3.setQuantidade(200);
                p3.setEstoqueMinimo(50);
                p3.setDescricao("Açúcar cristal refinado");
                p3.setFornecedor("Fornecedor C");

                Produto p4 = new Produto();
                p4.setNome("Leite Integral (Litro)");
                p4.setCategoria("🥛 Laticínios");
                p4.setPreco(4.20);
                p4.setQuantidade(80);
                p4.setEstoqueMinimo(20);
                p4.setDescricao("Leite integral fresco");
                p4.setFornecedor("Fornecedor D");

                Produto p5 = new Produto();
                p5.setNome("Copo Descartável 150ml");
                p5.setCategoria("🧾 Embalagens");
                p5.setPreco(0.25);
                p5.setQuantidade(500);
                p5.setEstoqueMinimo(100);
                p5.setDescricao("Copo descartável para bebidas quentes");
                p5.setFornecedor("Fornecedor E");

                produtoRepository.save(p1);
                produtoRepository.save(p2);
                produtoRepository.save(p3);
                produtoRepository.save(p4);
                produtoRepository.save(p5);

                System.out.println("✓ Produtos de exemplo criados com sucesso!");
            }
        };
    }
}

