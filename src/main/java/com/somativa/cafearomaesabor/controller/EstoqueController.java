package com.somativa.cafearomaesabor.controller;

import com.somativa.cafearomaesabor.model.Estoque;
import com.somativa.cafearomaesabor.model.Produto;
import com.somativa.cafearomaesabor.repository.EstoqueRepository;
import com.somativa.cafearomaesabor.repository.ProdutoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Controller
public class EstoqueController {

    private final EstoqueRepository estoqueRepository;
    private final ProdutoRepository produtoRepository;

    public EstoqueController(EstoqueRepository estoqueRepository, ProdutoRepository produtoRepository) {
        this.estoqueRepository = estoqueRepository;
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/estoque")
    public String listarEstoque(Model model) {
        model.addAttribute("produtos", produtoRepository.findAll());
        model.addAttribute("movimentacao", new Estoque());
        model.addAttribute("estoques", estoqueRepository.findAll());
        return "estoque";
    }

    @PostMapping("/estoque")
    public String registrarMovimentacao(@RequestParam Long produtoId,
                                        @RequestParam String tipo,
                                        @RequestParam Integer quantidade) {
        Produto produto = produtoRepository.findById(produtoId).orElse(null);

        Estoque mov = new Estoque();
        mov.setTipoMovimentacao(tipo);
        mov.setQuantidade(quantidade);
        if (produto != null) mov.setProdutos(Collections.singletonList(produto));

        estoqueRepository.save(mov);

        // Atualiza quantidade do produto
        if (produto != null) {
            int q = produto.getQuantidade() == null ? 0 : produto.getQuantidade();
            if ("entrada".equalsIgnoreCase(tipo)) q += quantidade;
            else q -= quantidade;
            produto.setQuantidade(Math.max(q, 0));
            produtoRepository.save(produto);
        }

        return "redirect:/estoque";
    }
}

