package com.somativa.cafearomaesabor.controller;

import com.somativa.cafearomaesabor.model.Produto;
import com.somativa.cafearomaesabor.repository.ProdutoRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/produtos")
    public String listarProdutos(Model model) {
        List<Produto> produtos = produtoRepository.findAll();
        model.addAttribute("produtos", produtos);
        model.addAttribute("produtoForm", new Produto());
        return "produtos";
    }

    @PostMapping("/produtos")
    public String salvarProduto(@ModelAttribute("produtoForm") Produto produto) {
        // normalizar campos simples
        if (produto.getQuantidade() == null) produto.setQuantidade(0);
        produtoRepository.save(produto);
        return "redirect:/produtos";
    }

    @GetMapping("/produtos/edit/{id}")
    public String editarProduto(@PathVariable Long id, Model model) {
        Produto p = produtoRepository.findById(id).orElse(new Produto());
        model.addAttribute("produtoForm", p);
        model.addAttribute("produtos", produtoRepository.findAll());
        return "redirect:/produtos";
    }

    @PostMapping("/produtos/delete/{id}")
    public String excluirProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
        return "redirect:/produtos";
    }
}

