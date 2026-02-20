from PIL import Image, ImageDraw, ImageFont
import math

def create_icon(size, filename):
    # Criar imagem com fundo gradiente azul
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)
    
    # Gradiente azul
    for y in range(size):
        color_value = int(25 + (115 - 25) * (y / size))
        color = (color_value, 118 + int((210 - 118) * (y / size)), 210)
        draw.line([(0, y), (size, y)], fill=color)
    
    # Desenhar raio elétrico
    center_x, center_y = size // 2, size // 2
    bolt_size = size * 0.5
    
    # Pontos do raio
    points = [
        (center_x, center_y - bolt_size * 0.5),
        (center_x + bolt_size * 0.15, center_y - bolt_size * 0.1),
        (center_x - bolt_size * 0.05, center_y - bolt_size * 0.1),
        (center_x + bolt_size * 0.15, center_y + bolt_size * 0.2),
        (center_x - bolt_size * 0.1, center_y + bolt_size * 0.2),
        (center_x + bolt_size * 0.05, center_y + bolt_size * 0.5),
        (center_x - bolt_size * 0.25, center_y + bolt_size * 0.1),
        (center_x - bolt_size * 0.05, center_y),
        (center_x - bolt_size * 0.2, center_y - bolt_size * 0.25)
    ]
    
    # Desenhar raio amarelo
    draw.polygon(points, fill=(255, 193, 7), outline=(255, 235, 59))
    
    # Adicionar círculo ao redor
    circle_margin = size * 0.1
    draw.ellipse(
        [(circle_margin, circle_margin), (size - circle_margin, size - circle_margin)],
        outline=(255, 255, 255),
        width=max(2, size // 64)
    )
    
    img.save(filename, 'PNG')
    print(f'Ícone {filename} criado com sucesso!')

# Criar ícones
create_icon(192, 'icon-192.png')
create_icon(512, 'icon-512.png')

print('\n✅ Todos os ícones foram criados!')
